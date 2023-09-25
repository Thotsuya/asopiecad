<?php

namespace App\Console\Commands;

use App\Models\Answer;
use App\Models\Benefitiary;
use App\Models\Field;
use Illuminate\Console\Command;

class ChangeFieldType extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:change-field-type';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Changes the type of a field in a form from text to select with Options [Si, No]';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("Starting process...");

        // Find the fields with names: 'Otro Tipo de cirugía','Pre quirúrgica','Post quirúrgica','Referencias','Traslados'

        $fields = Field::whereIn('name', [
            'Otro Tipo de cirugía',
            'Pre quirúrgica',
            'Post quirúrgica',
            'Referencias',
            'Traslados'
        ])->get();

        $options = [
            [
                'id' => 1,
                'name' => 'Si',
                'value' => 'si-1',
                'order' => 1,
                'editMode' => false
            ],
            [
                'id' => 2,
                'name' => 'No',
                'value' => 'No-2',
                'order' => 2,
                'editMode' => false
            ]
        ];

        $fields->each(function ($field) use ($options) {
            $field->type = 'select';
            $field->options = $options;
            $field->save();
        });

        $this->info("Found {$fields->count()} fields");

        $this->info("Updating beneficiaries...");
        Answer::query()
            ->whereIn('field_id', $fields->pluck('id')->toArray())
            ->get()
            ->each(function ($answer) use ($fields) {
                $answer->value = $this->newOptionForFields($answer->value);
                $answer->save();
            });

        $this->info("Done!");

    }

    private function newOptionForFields($value){
        return match ($value){
            'Si','si','S','SI','Sí','s' => 'si-1',
            default => 'No-2'
        };
    }
}
