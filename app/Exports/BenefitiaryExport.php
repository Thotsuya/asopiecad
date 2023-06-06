<?php

namespace App\Exports;

use App\Models\Benefitiary;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BenefitiaryExport implements FromCollection, WithHeadings
{

    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Benefitiary::query()
            ->withTrashed()
            ->filter($this->request)
            ->withCount('projects')
            ->with('projects')
            ->latest('id')
            ->get()
            ->map(function (Benefitiary $benefitiary){
                return [
                    'id' => $benefitiary->id,
                    'code' => $benefitiary->internal_id,
                    'name' => $benefitiary->name,
                    'Fecha de Registro' => Carbon::parse($benefitiary->created_at)->format('d/m/Y'),
                    'Estado' => $benefitiary->internal_status,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'ID',
            'Código',
            'Nombre',
            'Fecha de Registro',
            'Estado',
        ];
    }
}
