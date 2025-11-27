const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json()); 

//Configuración de la Base de Datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       
    password: 'Lalo1945',       
    database: 'hotel_db'
});

//Conectar a MySQL
db.connect(err => {
    if (err) {
        console.error('❌ Error conectando a la Base de Datos:', err);
        return;
    }
    console.log('✅ Conectado exitosamente a MySQL (hotel_db)');
});



//Obtener todas las habitaciones (GET)
app.get('/api/habitaciones', (req, res) => {
    const sql = 'SELECT * FROM habitaciones';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Guardar un nuevo cliente (POST)
app.post('/api/clientes', (req, res) => {
    const { nombre, email, telefono } = req.body;
    const sql = 'INSERT INTO clientes (nombre_completo, email, telefono) VALUES (?, ?, ?)';
    db.query(sql, [nombre, email, telefono], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Cliente registrado', id: result.insertId });
    });
});

// 3. Crear una reserva (POST)
app.post('/api/reservas', (req, res) => {
    const { fechaEntrada, fechaSalida, habitacionId, clienteId, total } = req.body;
    
    const sql = 'INSERT INTO reservas (fecha_entrada, fecha_salida, total, cliente_id, habitacion_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fechaEntrada, fechaSalida, total, clienteId, habitacionId], (err, result) => {
        if (err) return res.status(500).json(err);
        
        // Actualizar la habitación a "Ocupada"
        db.query('UPDATE habitaciones SET estado = "Ocupada" WHERE id = ?', [habitacionId]);
        
        res.json({ message: 'Reserva creada', id: result.insertId });
    });
});

app.get('/api/reservas', (req, res) => {
    const sql = `
        SELECT r.id, r.fecha_entrada, r.fecha_salida, r.total, 
               c.nombre_completo as cliente, 
               h.numero as habitacion
        FROM reservas r
        JOIN clientes c ON r.cliente_id = c.id
        JOIN habitaciones h ON r.habitacion_id = h.id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        
        const finalResults = results.map(r => ({...r, estado: 'Confirmada'}));
        res.json(finalResults);
    });
});


app.delete('/api/reservas/:id', (req, res) => {
    const { id } = req.params;

    const sqlGetRoom = 'SELECT habitacion_id FROM reservas WHERE id = ?';
    
    db.query(sqlGetRoom, [id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: 'Reserva no encontrada' });

        const habitacionId = results[0].habitacion_id;

        const sqlUpdateRoom = 'UPDATE habitaciones SET estado = "Disponible" WHERE id = ?';
        db.query(sqlUpdateRoom, [habitacionId], (errUpdate) => {
            if (errUpdate) console.error('Error al liberar la habitación');
            
            const sqlDelete = 'DELETE FROM reservas WHERE id = ?';
            db.query(sqlDelete, [id], (errDelete, result) => {
                if (errDelete) return res.status(500).json(errDelete);
                res.json({ message: 'Reserva cancelada y habitación liberada correctamente' });
            });
        });
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});