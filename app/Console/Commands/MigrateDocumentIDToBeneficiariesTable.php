<?php

namespace App\Console\Commands;

use App\Models\Answer;
use App\Models\Benefitiary;
use Illuminate\Console\Command;

class MigrateDocumentIDToBeneficiariesTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:migrate-document-id-to-beneficiaries-table';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrates the document id from the answers table to the beneficiaries table';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Find the document fields in the fields Table
        //1. Print on the console 'Fetching document fields...'
        $this->info('Fetching document fields...');
        $documentFields = \App\Models\Field::where('name', 'LIKE', '%Cedula%')->get();


        //2. Find the answers that match the document fields id
        $this->info('Fetching beneficiaries with document fields...');

        $beneficiaries = Benefitiary::whereHas('answers', function ($query) use ($documentFields) {
            $query->whereIn('field_id', $documentFields->pluck('id'));
        })->get();

        //3. Print on the console 'Migrating document fields...'

        $this->info('Migrating document fields...');
        $this->info('Total beneficiaries: ' . $beneficiaries->count());

        $bar = $this->output->createProgressBar($beneficiaries->count());

        $bar->start();

        $beneficiaries->each(function ($beneficiary) use ($documentFields, $bar) {
            $documentFields->each(function ($documentField) use ($beneficiary) {
                $answer = Answer::where('benefitiary_id', $beneficiary->id)
                    ->where('field_id', $documentField->id)
                    ->first();

                if ($answer) {
                    $beneficiary->document_id = $answer->value;
                    $beneficiary->save();
                }
            });

            $bar->advance();
        });

        $bar->finish();

        $this->info('Done!');
    }
}
