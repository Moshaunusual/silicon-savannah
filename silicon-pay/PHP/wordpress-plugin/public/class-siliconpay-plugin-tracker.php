<?php
class spg_wp_siliconpay_plugin_tracker {
    var $public_key;
    var $plugin_name;
    function __construct($plugin, $pk){
       $this->plugin_name = $plugin;
        $this->public_key = $pk;
    }



    function log_transaction_success($trx_ref){
        //send reference to logger along with plugin name and public key
        $url = "https://silicon-pay.com/plugin-log/usage";

        $fields = [
            'plugin_name'  => $this->plugin_name,
            'transaction_reference' => $trx_ref,
            'public_key' => $this->public_key
        ];

        $fields_string = http_build_query($fields);

       return;
    }
} 
