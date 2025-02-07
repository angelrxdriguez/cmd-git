$(document).ready(function () {
    $('.sacar1').on('click', function () {
        $.ajax({
            url: 'https://py-vercel-kappa.vercel.app/api/users/user1', 
            method: 'GET', 
            success: function (user) {
                $('.contenedor').html(`
                    <div class="card">
                        <h2>ID: ${user.id}</h2>
                        <p>Nombre: ${user.nombre}</p>
                        <p>Apellido: ${user.apellido}</p>
                    </div>
                `);
            },
            error: function (error) {
                console.error('Error al obtener el primer usuario:', error);
                $('.contenedor').html('<p style="color: red;">Error al obtener el primer usuario.</p>');
            }
        });
    });

    $('.sacarTodos').on('click', function () {
        $.ajax({
            url: 'https://py-vercel-kappa.vercel.app/api/users/', 
            method: 'GET',
            success: function (users) {
                $('.contenedor').html(''); 
                users.forEach(user => {
                    $('.contenedor').append(`
                        <div class="card">
                            <h2>Usuario ID: ${user.id}</h2>
                            <p><strong>Nombre:</strong> ${user.nombre}</p>
                            <p><strong>Apellido:</strong> ${user.apellido}</p>
                        </div>
                    `);
                });
            },
            error: function (error) {
                console.error('Error al obtener los usuarios:', error);
                $('.contenedor').html('<p style="color: red;">Error al obtener los usuarios.</p>');
            }
        });
    });

    $('#crearUsuarioForm').on('submit', function (e) {
        e.preventDefault(); 

        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();

        $.ajax({
            url: 'https://py-vercel-kappa.vercel.app/api/users', 
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nombre, apellido }), 
            success: function (nuevoUsuario) {
                alert(`Usuario creado: ${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`);
                $('#crearUsuarioForm')[0].reset();
            },
            error: function (error) {
                console.error('Error al crear el usuario:', error);
                alert('Hubo un problema al crear el usuario.');
            }
        });
    });

    $('#buscar').on('submit', function (e) {
        e.preventDefault(); 

        const id = $('#id').val();

        $.ajax({
            url: `https://py-vercel-kappa.vercel.app/api/users/${id}`, 
            method: 'GET',
            success: function (user) {
                $('.contenedor').html(`
                    <div class="card">
                        <h2>ID: ${user.id}</h2>
                        <p>Nombre: ${user.nombre}</p>
                        <p>Apellido: ${user.apellido}</p>
                    </div>
                `);
            },
            error: function (error) {
                console.error('Error al obtener el usuario:', error);
                $('.contenedor').html('<p style="color: red;">No se encontró el usuario con ese ID.</p>');
            }
        });
    });
});
