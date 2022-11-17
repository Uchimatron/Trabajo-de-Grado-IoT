<?php
    require_once "db.php";
    $conexion=conexion();
    function repetidos($cel, $cor, $conexion){
        $consulta = "SELECT*FROM contactos where celular = '$cel' or correo = '$cor'";
        $resultado = mysqli_query($conexion, $consulta);
        $filas = mysqli_num_rows($resultado);
        if($filas > 0){
            return 1;
        }else{
            return 0;
        }
    }
    if(!empty($_POST["enviar"])){
        if(!empty($_POST{"telefono"}) or !empty($_POST["email"])){
            $email = $_POST["email"];
            $telefono =$_POST["telefono"];
            if(repetidos($telefono, $email, $conexion) == 1){
                include("contactanos.html");
                ?>
                <h3 class="bad_2">Ya te habias registrado</h3>;
                <?php
            }else{
                $sql = $conexion->query(" insert into contactos(celular,correo)values('$telefono','$email')");
                if($sql == 1){
                    include("contactanos.html");
                    ?>
                    <h3 class="good">Datos registrados con éxito</h3>;
                    <?php
                }else{
                    include("contactanos.html");  
                    ?>
                    <h3 class="bad_2">Falló el registro de datos</h3>;
                    <?php
                }
            }
        }
    }
    mysqli_close($conexion);
?>