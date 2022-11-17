<?php
$usuario = $_POST['username'];
$contraseña = $_POST['password'];

session_start();
$_SESSION['realinit'] = $usuario;

require_once "db.php";
$conexion = conexion();

$consulta = "SELECT*FROM usuarios where user = '$usuario' and pass = '$contraseña'";
$resultado = mysqli_query($conexion, $consulta);

$filas = mysqli_num_rows($resultado);

if($filas){
    header("location:index.html");
}else{
    include("loguin.html");
    ?>
    <h3 class="bad">Error de validación</h3>
    <?php
}
mysqli_free_result($resultado);
mysqli_close($conexion);
?>