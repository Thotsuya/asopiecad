<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidateDocumentRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        dd($value);
        // Validate the document id is the format XXX-XXXXXX-XXXXX
        return preg_match('/^[0-9]{3}-[0-9]{6}-[0-9]{5}$/', $value) === 1;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The validation error message.';
    }
}
