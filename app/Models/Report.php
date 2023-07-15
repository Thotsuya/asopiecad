<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'title',
        'fields',
        'global_fields',
        'generated_at'
    ];

    protected $casts = [
        'fields' => 'json',
        'global_fields' => 'json',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function excelReports()
    {
        return $this->morphMany(ExcelReports::class, 'reportable');
    }
}
