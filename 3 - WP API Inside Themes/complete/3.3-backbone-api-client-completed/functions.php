<?php

// Load in our JS
function jsforwp_enqueue_scripts() {

  if( is_page_template( 'custom.php' ) ) {

    // Make dependent on 'wp-api'    
    wp_enqueue_script(
      'jsforwp-theme-js',
      get_stylesheet_directory_uri() . '/assets/js/theme.js',
      [ 'wp-api' ],
      time(),
      true
    );

  }

}
add_action( 'wp_enqueue_scripts', 'jsforwp_enqueue_scripts' );

// Load in our CSS
function jsforwp_enqueue_styles() {

  wp_enqueue_style( 'roboto-slab-font-css', 'https://fonts.googleapis.com/css?family=Roboto+Slab', [], '', 'all' );
  wp_enqueue_style( 'main-css', get_stylesheet_directory_uri() . '/style.css', ['roboto-slab-font-css'], time(), 'all' );
  wp_enqueue_style( 'custom-css', get_stylesheet_directory_uri() . '/assets/css/custom.css', [ 'main-css' ], time(), 'all' );

}
add_action( 'wp_enqueue_scripts', 'jsforwp_enqueue_styles' );

require_once( 'assets/lib/functions-extended.php' );

?>
