@php
    $beneficiaryData = [];
    foreach ($beneficiaries as $beneficiary) {
        $answers = collect($beneficiary['answers'])->keyBy('field');
        $beneficiaryData[$beneficiary['id']] = [
            'uuid' => $beneficiary['uuid'],
            'internal_status' => $beneficiary['internal_status'],
            'name' => $beneficiary['name'],
            'projects' => $beneficiary['projects'],
            'answers' => $answers,
        ];
    }
@endphp


<table>
    <thead>
    <tr>
        <th style="background-color: #1F497D; color: white">
            ID
        </th>
        <th style="background-color: #1F497D; color: white">
            UUID
        </th>
        <th style="background-color: #1F497D; color: white">
            Estado
        </th>
        <th style="background-color: #1F497D; color: white">
            Nombre
        </th>
        <th style="background-color: #1F497D; color: white">
            Proyectos
        </th>
        @foreach($headers as $header)
            <th style="background-color: #1F497D; color: white">
                {{ $header }}
            </th>
        @endforeach
    </tr>
    </thead>
    <tbody>
    @foreach ($beneficiaryData as $beneficiaryId => $data)
        <tr>
            <td>{{ $beneficiaryId }}</td>
            <td>{{ $data['uuid'] }}</td>
            <td>{{ $data['internal_status'] }}</td>
            <td>{{ $data['name'] }}</td>
            <td>{{ $data['projects'] }}</td>
            @foreach ($headers as $header)
                <td>{{ $data['answers']->where('field', $header)->first()['answer'] }}</td>
            @endforeach
        </tr>
    @endforeach
    </tbody>
</table>
