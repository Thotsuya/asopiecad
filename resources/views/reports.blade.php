<table>
    <thead>
    <tr>
        <th style="background-color: #1F497D; color: white; width: 250px">
            Descripci贸n de los
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
        @foreach($headers as $header)
            <th style="background-color: #1F497D; color: white">
                {{ $header }}
            </th>'
        @endforeach
        <th style="background-color: #1F497D; color: white">
            Visitas realizadas a los
            beneficiarios en este
            indicador
        </th>
        <th style="background-color: #1F497D; color: white">
            N煤mero total de personas
        </th>
        <th style="background-color: #1F497D; color: white">
            Pendientes
        </th>
    </tr>
    </thead>
    <tbody>
    @foreach($results as $result)
        <tr>
            <td style="width: 250px; height: 100px; word-wrap: break-word">
                {{ $result['goal_description'] }}
            </td>
            <td>
                <strong>{{ $result['goal_target'] }}</strong>
            </td>
            <td style="background-color: #FFFF99">
                {{ $result['program']['beneficiaries_count'] }}
            </td>
            <td style="background-color: #FFFF99">
                {{ $result['program']['completed_percentage'] }}%
            </td>
            <td style="background-color: #FFFF99">
                <strong> {{ $result['goal_target'] / $project->project_duration }}</strong>
            </td>
            @foreach($headers as $header)
                @php
                    $value = collect($result['conditions'])->where('label', $header)->first();
                @endphp
                <td style="background-color: #FFFF99; text-align: center">
                    @if($value)
                        {{ $value['value'] }}
                    @else
                        <span style="color: #FF0000">N/A</span>
                    @endif
                </td>
            @endforeach
            <td>
                <strong>{{ $result['program']['visits'] }}</strong>
            </td>
            <td>
                {{ $result['program']['beneficiaries_count'] }}
            </td>
            <td>
                {{ $result['goal_target'] - $result['program']['beneficiaries_count'] }}
            </td>
        </tr>
    @endforeach
    </tbody>

</table>


{{--@foreach($results as $result)--}}
{{--    <table>--}}
{{--        <thead>--}}
{{--        <tr>--}}
{{--            <th style="background-color: #1F497D; color: white; width: 250px">--}}
{{--                Descripci贸n de los--}}
{{--                indicadores--}}
{{--            </th>--}}
{{--            <th style="background-color: #1F497D; color: white">--}}
{{--                Meta--}}
{{--            </th>--}}
{{--            <th style="background-color: #1F497D; color: white">--}}
{{--                Progreso--}}
{{--            </th>--}}
{{--            <th style="background-color: #1F497D; color: white">--}}
{{--                Porcentaje completado--}}
{{--            </th>--}}
{{--            <th style="background-color: #1F497D; color: white">--}}
{{--                Meta anual--}}
{{--            </th>--}}
{{--            @foreach($result['conditions'] as $condition)--}}
{{--                <th style="background-color: #1F497D; color: white">--}}
{{--                    {{ $condition['label'] }}--}}
{{--                </th>'--}}
{{--            @endforeach--}}
{{--            <th style="background-color: #1F497D; color: white">--}}
{{--                Visitas realizadas a los--}}
{{--                beneficiarios en este--}}
{{--                indicador--}}
{{--            </th>--}}
{{--            <th style="background-color: #1F497D; color: white">--}}
{{--                N煤mero total de personas--}}
{{--            </th>--}}
{{--            <th style="background-color: #1F497D; color: white">--}}
{{--                Pendientes--}}
{{--            </th>--}}
{{--        </tr>--}}
{{--        </thead>--}}

{{--        <tbody>--}}
{{--        <tr>--}}
{{--            <td style="width: 250px; height: 100px; word-wrap: break-word">--}}
{{--                {{ $result['goal_description'] }}--}}
{{--            </td>--}}
{{--            <td>--}}
{{--                <strong>{{ $result['goal_target'] }}</strong>--}}
{{--            </td>--}}
{{--            <td style="background-color: #FFFF99">--}}
{{--                {{ $result['program']['beneficiaries_count'] }}--}}
{{--            </td>--}}
{{--            <td style="background-color: #FFFF99">--}}
{{--                {{ $result['program']['completed_percentage'] }}%--}}
{{--            </td>--}}
{{--            <td style="background-color: #FFFF99">--}}
{{--                <strong> {{ $result['goal_target'] / $project->project_duration }}</strong>--}}
{{--            </td>--}}
{{--            @foreach($result['conditions'] as $condition)--}}
{{--                <td style="background-color: #FFFF99; text-align: center">--}}
{{--                    <strong>{{ $condition['value'] }}</strong>--}}
{{--                </td>--}}
{{--            @endforeach--}}
{{--            <td>--}}
{{--                <strong>{{ $result['visits'] }}</strong>--}}
{{--            </td>--}}
{{--            <td>--}}
{{--                {{ $result['program']['beneficiaries_count'] }}--}}
{{--            </td>--}}
{{--            <td>--}}
{{--                {{ $result['goal_target'] - $result['program']['beneficiaries_count'] }}--}}
{{--            </td>--}}
{{--        </tr>--}}
{{--        </tbody>--}}
{{--    </table>--}}
{{--@endforeach--}}


<table>
    <thead>
    <tr>
        <th style="background-color: #1F497D; color: white">
            Descripci贸n de los
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
            N煤mero total de personas
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
