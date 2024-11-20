<?php

namespace App\Console\Commands;

use App\Models\Benefitiary;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class GenerateAnswers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:generate-answers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Benefitiary::query()
            ->withTrashed()
            ->viewableBy(User::find(1))
            ->withCount('projects')
            ->with(['answers.pivot.field', 'answers.pivot','projects'])
            ->whereBetween('updated_at', [now()->startOfDay(), now()->endOfDay()])
            ->latest('id')
            ->chunk(5000, function ($chunk) {
                $this->info('Processing chunk of 5000 beneficiaries');
                // Chunk the results to avoid memory issues
                //Update the 'answers' field for each beneficiary
                $chunk->each(function (Benefitiary $beneficiary) {
                    $beneficiary->update([
                        'answers_data' => $beneficiary->answers->map(function ($answer) {
                            return [
                                'field'  => $answer->pivot->field->name,
                                'answer' => $this->getAnswerValue($answer),
                            ];
                        })->values()->toArray(),
                    ]);
                });
            });
    }

    private function getAnswerValue($answer)
    {
        if ($answer->pivot->field->type === 'select') {
            //  return $answer->pivot->field->options->where('value', json_decode($answer->pivot->value))->first()->name;
            return  Arr::get(collect($answer->pivot->field->options)->where('value', $answer->pivot->value)->first(), 'name', null);
        }

        if ($answer->pivot->field->type === 'select multiple') {
//            return $answer->pivot->field->options->whereIn('value', json_decode($answer->pivot->value))->pluck('name')->implode(', ');
            return collect($answer->pivot->field->options)->whereIn('value', json_decode($answer->pivot->value))->pluck(
                'name'
            )->implode(', ');
        }

        return Str::startsWith($answer->pivot->value, '["') && Str::endsWith($answer->pivot->value, '"]')
            ? json_decode($answer->pivot->value) : $answer->pivot->value;
    }
}
