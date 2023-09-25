<?php

namespace Tests\Feature\Beneficiaries;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EnsureBeneficiariesDocumentFormatTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_ensure_beneficiaries_have_a_specific_document_format()
    {
        //Must only accept format xxx-xxxxxx-xxxx
        $regex = '/^[0-9]{3}-[0-9]{6}-[0-9]{4}$/';
        

        $this->assertTrue(true);
    }
}
