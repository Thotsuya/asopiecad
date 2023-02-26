@foreach($results as $result)
    <table>
        <thead>
        <tr>
            <th>
                Descripción de los
                indicadores
            </th>
            <th>
                Meta
            </th>
            <th>
                Progreso
            </th>
            <th>
                Porcentaje completado
            </th>
            @foreach($result['conditions'] as $condition)
                <th>
                    {{ $condition['label'] }}
                </th>'
            @endforeach
            <th>
                Visitas realizadas a los
                beneficiarios en este
                indicador
            </th>
            <th>
                Número total de personas
            </th>
            <th>
                Pendientes
            </th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td>
                {{ $result['goal_description'] }}
            </td>
            <td>
                {{ $result['goal_target'] }}
            </td>
            <td>
                {{ $result['program']['beneficiaries_count'] }}
            </td>
            <td>
                {{ $result['program']['completed_percentage'] }}%
            </td>
            @foreach($result['conditions'] as $condition)
                <td>
                    {{ $condition['value'] }}
                </td>
            @endforeach
            <td>
                {{ $result['visits'] }}
            </td>
            <td>
                {{ $result['program']['beneficiaries_count'] }}
            </td>
            <td>
                {{ $result['goal_target'] - $result['program']['beneficiaries_count'] }}
            </td>
        </tr>
        </tbody>
    </table>
@endforeach


<table>
    <thead>
    <tr>
        <th>
            Descripción de los
            indicadores
        </th>
        <th>
            Meta
        </th>
        <th>
            Progreso
        </th>
        <th>
            Porcentaje completado
        </th>

        @foreach($global['conditions'] as $condition)
            <th>
                {{ $condition['label'] }}
            </th>'
        @endforeach
        <th>
            Visitas realizadas a los
            beneficiarios en este
            indicador
        </th>
        <th>
            Número total de personas
        </th>
        <th>
            Pendientes
        </th>
    </tr>
    </thead>

    <tbody>
    <tr>
        <td>
            {{ $global['goal_description'] }}
        </td>
        <td>
            {{ $global['goal_target'] }}
        </td>
        <td>
            {{ $global['total_beneficiaries'] }}
        </td>
        <td>
            {{ $global['completed_percentage'] }}%
        </td>
        @foreach($global['conditions'] as $condition)
            <td>
                {{ $condition['value'] }}
            </td>
        @endforeach
        <td>
            {{ $global['total_visits'] }}
        </td>
        <td>
            {{ $global['total_beneficiaries'] }}
        </td>
        <td>
            {{ $global['goal_target'] - $global['total_beneficiaries'] }}
        </td>
    </tbody>
</table>
