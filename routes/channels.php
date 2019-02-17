<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('newTva', function(){
        return true;
    });
Broadcast::channel('delTva', function(){
        return true;
    });
Broadcast::channel('newReglement', function(){
        return true;
    });
Broadcast::channel('delReglement', function(){
        return true;
    });
Broadcast::channel('updateFacture', function(){
        return true;
    });
Broadcast::channel('newFacture', function(){
        return true;
    });
Broadcast::channel('newModeReglement', function(){
        return true;
    });
Broadcast::channel('delModeReglement', function(){
        return true;
    });
Broadcast::channel('newClient', function(){
        return true;
    });
Broadcast::channel('delClient', function(){
        return true;
    });
Broadcast::channel('updateClient', function(){
        return true;
    });
Broadcast::channel('newProduit', function(){
        return true;
    });
Broadcast::channel('delProduit', function(){
        return true;
    });
Broadcast::channel('updateProduit', function(){
        return true;
    });
Broadcast::channel('updateInformation', function(){
        return true;
    });
