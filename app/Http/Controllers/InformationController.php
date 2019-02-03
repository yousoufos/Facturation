<?php

namespace App\Http\Controllers;

use App\Information;
use Illuminate\Http\Request;
use Intervention\Image\Image;

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
        if($request->get('logo'))
       {

          $image = $request->get('logo');
          $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
          \Image::make($request->get('logo'))->save(public_path('images/').$name);
          $information->logo = url('Facturation/public/images/'.$name);
       $information->save();
        }
       $information->update($request->except('logo'));
       return response()->json(['information'=> $information],200);
     }
     public function destroy($id)
    {
        $information = Information::findOrFail($id);
        $information->delete();
        return response()->json('information '.$id.' effacé avec succée');
    }

}
