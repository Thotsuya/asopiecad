<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ScreeningRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check() && auth()->user()->can('Registrar Tamizaje');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'                      => ['required', 'string', 'max:255'],
            'registrant_name'           => ['required', 'string', 'max:255'],
            'gender'                    => ['required', 'string', 'max:255'],
            'age'                       => ['required', 'string', 'max:255'],
            'date_of_screening'         => ['required', 'date', 'max:255'],
            'municipality'              => ['required', 'string', 'max:255'],
            'department'                => ['required', 'string', 'max:255'],
            'communication_level_1'     => ['required', 'integer', 'min:0', 'max:10'],
            'communication_level_2'     => ['required', 'integer', 'min:0', 'max:10'],
            'communication_level_3'     => ['required', 'integer', 'min:0', 'max:10'],
            'communication_level_4'     => ['required', 'integer', 'min:0', 'max:10'],
            'communication_level_5'     => ['required', 'integer', 'min:0', 'max:10'],
            'communication_level_6'     => ['required', 'integer', 'min:0', 'max:10'],
            'wide_movements_level_1'    => ['required', 'integer', 'min:0', 'max:10'],
            'wide_movements_level_2'    => ['required', 'integer', 'min:0', 'max:10'],
            'wide_movements_level_3'    => ['required', 'integer', 'min:0', 'max:10'],
            'wide_movements_level_4'    => ['required', 'integer', 'min:0', 'max:10'],
            'wide_movements_level_5'    => ['required', 'integer', 'min:0', 'max:10'],
            'wide_movements_level_6'    => ['required', 'integer', 'min:0', 'max:10'],
            'fine_movements_level_1'    => ['required', 'integer', 'min:0', 'max:10'],
            'fine_movements_level_2'    => ['required', 'integer', 'min:0', 'max:10'],
            'fine_movements_level_3'    => ['required', 'integer', 'min:0', 'max:10'],
            'fine_movements_level_4'    => ['required', 'integer', 'min:0', 'max:10'],
            'fine_movements_level_5'    => ['required', 'integer', 'min:0', 'max:10'],
            'fine_movements_level_6'    => ['required', 'integer', 'min:0', 'max:10'],
            'problem_solving_level_1'   => ['required', 'integer', 'min:0', 'max:10'],
            'problem_solving_level_2'   => ['required', 'integer', 'min:0', 'max:10'],
            'problem_solving_level_3'   => ['required', 'integer', 'min:0', 'max:10'],
            'problem_solving_level_4'   => ['required', 'integer', 'min:0', 'max:10'],
            'problem_solving_level_5'   => ['required', 'integer', 'min:0', 'max:10'],
            'problem_solving_level_6'   => ['required', 'integer', 'min:0', 'max:10'],
            'social_individual_level_1' => ['required', 'integer', 'min:0', 'max:10'],
            'social_individual_level_2' => ['required', 'integer', 'min:0', 'max:10'],
            'social_individual_level_3' => ['required', 'integer', 'min:0', 'max:10'],
            'social_individual_level_4' => ['required', 'integer', 'min:0', 'max:10'],
            'social_individual_level_5' => ['required', 'integer', 'min:0', 'max:10'],
            'social_individual_level_6' => ['required', 'integer', 'min:0', 'max:10'],
        ];
    }
}
