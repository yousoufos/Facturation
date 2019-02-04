<?php

namespace App\Http\Controllers;

use App\Information;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class InformationController extends Controller
{
    public function index()
    {
        $information = Information::All();
        return response()->json(['information'=> $information]);
    }

    public function update(Request $request, $id)
    {
        $information = Information::find($id);
       $information->update($request->all());
       return response()->json(['information'=> $information],200);
     }
     public function destroy($id)
    {
        $information = Information::findOrFail($id);
        $information->delete();
        return response()->json('information '.$id.' effacé avec succée');
    }

}
