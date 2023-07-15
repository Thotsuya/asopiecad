<?php

namespace App\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

trait DynamicComparisons{

    private $operatorToMethodTranslation = [
        '=='  => 'equal',
        '===' => 'totallyEqual',
        '!='  => 'notEqual',
        '>'   => 'greaterThan',
        '<'   => 'lessThan',
        '>='  => 'greaterThanOrEqual',
        '<='  => 'lessThanOrEqual',
        'contains' => 'contains',
        'not contains' => 'doesNotContain',
        'doesNotContain' => 'doesNotContain',
        'startsWith' => 'startsWith',
        'endsWith' => 'endsWith',

    ];

    protected function is($value_a, $operation, $value_b){

        if($method = $this->operatorToMethodTranslation[$operation]){
            return $this->$method($value_a, $value_b);
        }

        throw new \Exception('Unknown Dynamic Operator.');
    }

    private function equal($value_a, $value_b){

        if(is_array($value_b)){
            return in_array($value_a, $value_b);
        }

        return $value_a == $value_b;
    }

    private function totallyEqual($value_a, $value_b){
        return $value_a === $value_b;
    }

    private function notEqual($value_a, $value_b){

        if(is_array($value_a)){
            return !in_array($value_b, $value_a);
        }
        return $value_a != $value_b;
    }

    private function greaterThan($value_a, $value_b){

        // If the value b contains the word mes, meses, dias, año, años, then we need to convert it to days
        if(Str::contains(strtolower($value_a), ['m','a','d','mes', 'meses', 'día', 'días', 'año', 'años'])){
            return $this->convertToYears($value_a) > $value_b;
        }

        if(strtotime($value_a) && strtotime($value_b)){
            return Carbon::parse($value_a)->gt(Carbon::parse($value_b));
        }
        return $value_a > $value_b;
    }

    private function lessThan($value_a, $value_b){

        // If the value b contains the word mes, meses, dias, año, años, then we need to convert it to days
        if(Str::contains(strtolower($value_a), ['m','a','d','mes', 'meses', 'día', 'días', 'año', 'años'])){
            return $this->convertToYears($value_a) < $value_b;
        }

        if(strtotime($value_a) && strtotime($value_b)){
            return Carbon::parse($value_a)->lt(Carbon::parse($value_b));
        }

        return $value_a < $value_b;
    }

    // Value a is the value from the beneficiary
    // Value b is the value from the filter
    private function greaterThanOrEqual($value_a, $value_b){

        // If the value b contains the word mes, meses, dias, año, años, then we need to convert it to days
        if(Str::contains(strtolower($value_a), ['m','a','d','mes', 'meses', 'día', 'días', 'año', 'años'])){
            return $this->convertToYears($value_a) >= $value_b;
        }

        if(strtotime($value_a) && strtotime($value_b)){
            return Carbon::parse($value_a)->gte(Carbon::parse($value_b));
        }

        return $value_a >= $value_b;
    }

    private function lessThanOrEqual($value_a, $value_b){

        // If the value b contains the word mes, meses, dias, año, años, then we need to convert it to days
        if(Str::contains(strtolower($value_a), ['m','a','d','mes', 'meses', 'día', 'días', 'año', 'años'])){
            return $this->convertToYears($value_a) <= $value_b;
        }

        if(strtotime($value_a) && strtotime($value_b)){
            return Carbon::parse($value_a)->lte(Carbon::parse($value_b));
        }

        return $value_a <= $value_b;
    }

    private function contains($value_a, $value_b){

        if(is_array($value_a) && is_array($value_b)){
            return count(array_intersect($value_a, $value_b)) > 0;
        }

        if(is_array($value_a)){
            return in_array($value_b, $value_a);
        }

        if(is_array($value_b)){
            return in_array($value_a, $value_b);
        }

        return str_contains($value_a, $value_b);
    }

    private function doesNotContain($value_a, $value_b){
        if(is_array($value_a) && is_array($value_b)){
            return count(array_intersect($value_a, $value_b)) == 0;
        }

        if(is_array($value_a)){
            return !in_array($value_b, $value_a);
        }

        if(is_array($value_b)){
            return !in_array($value_a, $value_b);
        }

        return !str_contains($value_a, $value_b);
    }

    private function startsWith($value_a, $value_b){



        if(is_array($value_b)){
            return collect($value_b)->contains(function($item) use ($value_a){
                return str_starts_with($value_a, $item);
            });
        }

        if(is_array($value_a)){
            return collect($value_a)->contains(function($item) use ($value_b){
                return str_starts_with($item, $value_b);
            });
        }


        return str_starts_with($value_a, $value_b);
    }

    private function endsWith($value_a, $value_b){

        if(is_array($value_b)){
            return collect($value_b)->contains(function($item) use ($value_a){
                return Str::endsWith($value_a, $item);
            });
        }

        return Str::endsWith($value_a, $value_b);
    }

    private function convertToYears($value){

        $valueToConvert = Arr::first(explode(' ', $value));
        $TimeUnit = Arr::last(explode(' ', $value));

        return match (strtolower($TimeUnit)) {
            'm','mes', 'meses' => $valueToConvert / 12,
            'd','día', 'días', 'dia', 'dias' => $valueToConvert / 365,
            'a','año', 'años' => $valueToConvert,
            default => $valueToConvert,
        };
    }
}
