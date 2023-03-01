@foreach($results as $result)
    <table>
        <thead>
        <tr>
            <th style="background-color: #1F497D; color: white">
                Descripción de los
                indicadores
            </th>
            <th style="background-color: #1F497D; color: white">
                Meta
            </th>
            <th style="background-color: #1F497D; color: white">
                Progreso
            </th>
            <th style="background-color: #1F497D; color: white">
                Porcentaje completado
            </th>
            <th style="background-color: #1F497D; color: white">
                Meta anual
            </th>
            @foreach($result['conditions'] as $condition)
                <th style="background-color: #1F497D; color: white">
                    {{ $condition['label'] }}
                </th>'
            @endforeach
            <th style="background-color: #1F497D; color: white">
                Visitas realizadas a los
                beneficiarios en este
                indicador
            </th>
            <th style="background-color: #1F497D; color: white">
                Número total de personas
            </th>
            <th style="background-color: #1F497D; color: white">
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
            <td style="background-color: #FFFF99">
                {{ $result['program']['beneficiaries_count'] }}
            </td>
            <td style="background-color: #FFFF99">
                {{ $result['program']['completed_percentage'] }}%
            </td>
            <td style="background-color: #FFFF99">
                {{ $result['goal_target'] / $project->project_duration }}
            </td>
            @foreach($result['conditions'] as $condition)
                <td style="background-color: #FFFF99">
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
        <th style="background-color: #1F497D; color: white">
            Descripción de los
            indicadores
        </th>
        <th style="background-color: #1F497D; color: white">
            Meta
        </th>
        <th style="background-color: #1F497D; color: white">
            Progreso
        </th>
        <th style="background-color: #1F497D; color: white">
            Porcentaje completado
        </th>

        @foreach($global['conditions'] as $condition)
            <th style="background-color: #1F497D; color: white">
                {{ $condition['label'] }}
            </th>'
        @endforeach
        <th style="background-color: #1F497D; color: white">
            Visitas realizadas a los
            beneficiarios en este
            indicador
        </th>
        <th style="background-color: #1F497D; color: white">
            Número total de personas
        </th>
        <th style="background-color: #1F497D; color: white">
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
