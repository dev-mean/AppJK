<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'blog');

/** MySQL database username */
define('DB_USER', 'uzoma');

/** MySQL database password */
define('DB_PASSWORD', 'uzoma@1987');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'k~8]{PZ):IaWc xS9Fd!CvkV[:;tY2-7(;rY`|8f:|#~m&IMM[Xc r#Y6YFm[2X}');
define('SECURE_AUTH_KEY',  'k] F}UzVW.q=?20jQs($:&;0|/q(WH*E0w(`8[2d<TpiVN:&/UF%-,#N;a}$XzR)');
define('LOGGED_IN_KEY',    'lf!Og Rq/f0/JiUY5kiK%vwV.~5Zk[)YE3J#!->w43PDo`>{X_+HQRPyWq=fV)*p');
define('NONCE_KEY',        'Ot4Nc@qVB;|;t_Ad5_INV-_#ZKRj-blbbIq#L+>WkXnMp>|V>2R{S>S|G*@q1l@F');
define('AUTH_SALT',        'Y)s3),.VH0aI}aL+XG(9=7De!D=i,oDAV_0Hr$Pwji_&`cL0p*9~ re)vnK%-vs9');
define('SECURE_AUTH_SALT', 'CcS}6HSG[M%0iHE%}+-_UFu|s!Py>&]Y+%:O0qiC:U7|eo8NTc#V*uL6uqFN15y{');
define('LOGGED_IN_SALT',   'p|yjj07Qhl?5^]LJ>plv]fhmEovg-q|y=:nh-ve/&gNb:qwm`3x{2 vRO:i7?zo ');
define('NONCE_SALT',       'ImuiP:nSuuR8{.^e?hxN7yYc+9s>?+()[hVcJ|J+!fQuwd|v3WaD&z av|zrU[9%');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
