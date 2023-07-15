<?php

namespace App\Exports;

use App\Models\Benefitiary;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\Exportable;

class BeneficiaryCompleteExport implements FromView
{
    use Exportable;

    public $beneficiaries;

    public function __construct($beneficiaries)
    {
        $this->beneficiaries = $beneficiaries;
    }

    public function view(): View
    {

        $headers = $this->beneficiaries->pluck('answers')->flatten(1)->pluck('field')->unique()->toArray();

        return view('beneficiaries', [
            'beneficiaries' => $this->beneficiaries,
            'headers'       => $headers,
        ]);
    }
}
