<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExcelReports extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_name',
        'file_path',
        'generated_at'
    ];

    public function reportable()
    {
        return $this->morphTo();
    }

    public function getFilePathAttribute($value)
    {
        return asset('storage/' . $value);
    }

    public function getGeneratedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->diffForHumans();
    }


}
