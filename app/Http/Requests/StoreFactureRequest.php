<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFactureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'statut' => 'required',
            'user_id' => 'required',
            'date_emission' => 'required|date',
            'date_echeance' => 'required|date',
            'client_id' => 'required',
            'total_ht' => 'required',
            'total_ttc' => 'required',
            'total_remise' => 'required',
            'total_tva' => 'required',
            'lignes' => 'array|min:1',

        ];
    }
    public function attributes()
{
    return [
        'client_id' => 'Client',
    ];
}
    public function messages()
{
    return [
        'statut.required'     => 'Le statut de la facture doit etre defini.',
        'user_id.required'     => 'Le user de la facture doit etre defini.',
        'date_emission.required'     => "La date d'emission de la facture doit etre definie",
        'date_emission.date'     => "La date d'emission n'est pas une date valide",
        'date_echeance.required'     => "La date d'echeance de la facture doit etre definie",
        'date_echeance.date'     => "La date d'echeance n'est pas une date valide",
        'client_id.required'     => "Le client doit etre defini",
        'total_ttc.required'     => "Le total HT doit etre defini",
        'total_ht.required'     => "Le total TTC doit etre defini",
        'total_tva.required'     => "Le total TVA doit etre defini",
        'total_remise.required'     => "Le total remise doit etre defini",
        'lignes.min'     => "La facture ne contient aucun produit",
    ];
}
}
