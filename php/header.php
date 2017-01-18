<!DOCTYPE html>
<html>
<head>
	<title>Timje</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- ****** faviconit.com favicons ****** -->
    <link rel="shortcut icon" href="images/icons/favicon.ico">
    <link rel="icon" sizes="16x16 32x32 64x64" href="images/icons/favicon.ico">
    <link rel="icon" type="image/png" sizes="196x196" href="images/icons/favicon-192.png">
    <link rel="icon" type="image/png" sizes="160x160" href="images/icons/favicon-160.png">
    <link rel="icon" type="image/png" sizes="96x96" href="images/icons/favicon-96.png">
    <link rel="icon" type="image/png" sizes="64x64" href="images/icons/favicon-64.png">
    <link rel="icon" type="image/png" sizes="32x32" href="images/icons/favicon-32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="images/icons/favicon-16.png">
    <link rel="apple-touch-icon" href="images/icons/favicon-57.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/icons/favicon-114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/icons/favicon-72.png">
    <link rel="apple-touch-icon" sizes="144x144" href="images/icons/favicon-144.png">
    <link rel="apple-touch-icon" sizes="60x60" href="images/icons/favicon-60.png">
    <link rel="apple-touch-icon" sizes="120x120" href="images/icons/favicon-120.png">
    <link rel="apple-touch-icon" sizes="76x76" href="images/icons/favicon-76.png">
    <link rel="apple-touch-icon" sizes="152x152" href="images/icons/favicon-152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="images/icons/favicon-180.png">
    <meta name="msapplication-TileColor" content="#FFFFFF">
    <meta name="msapplication-TileImage" content="images/icons/favicon-144.png">
    <meta name="msapplication-config" content="images/icons/browserconfig.xml">
    <!-- ****** faviconit.com favicons ****** -->
	<?php
		if (isset($options)) {
			if (isset($options['graph'])) {


				$ip = gethostbyname('mc.timje.se');
				$client = $_SERVER['REMOTE_ADDR'];

				if ($ip != $client){
				    echo '<script type="text/javascript">var ip = "mc.timje.se"</script>';
				}else{
				    echo '<script type="text/javascript">var ip = "192.168.0.110"</script>';
				}
				
				?>
				<script type="text/javascript" src="js/graph.js"></script>
				<?php
				# code...
			}
			if(isset($options['weather'])){
				?>
					<script type="text/javascript" src="js/apitest.js"></script>
					
					<link rel="stylesheet" type="text/css" href="css/weather.css">
				<?php
			}
			if(isset($options['photos'])){
				?>
				<script type="text/javascript" src="js/photos.js"></script>
				<link rel="stylesheet" type="text/css" href="css/photos.css">
				<?php
			}
		}
		

		$page = explode("/", $_SERVER['REQUEST_URI']);
		$page = array_reverse($page)[0];
		$page = explode("?", $page)[0];

		
	?>
</head>
<body>
<div class="background-image"></div>
<div id="sitecontainer">
<div id="loga"><img src="images/Logga.png" alt="Timje.se"></div>
<div class="site-color">
<header id="siteheader" class="site">
	<nav>
		
		<ul>
			<li>
				<a class = "<?php echo $page=='index' ? 'active' : ''; ?>" href="index">Home</a>
			</li>
			<li>
				<a class = "<?php echo $page=='photos' ? 'active' : ''; ?>" href="photos">Photos</a>
			</li>
			<li>
				<a class = "<?php echo $page=='games' ? 'active' : ''; ?>" href="games">Board games</a>
			</li>
		</ul>

	</nav>
</header>