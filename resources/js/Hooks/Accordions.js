export default function useAccordions(accordion) {
    $('#modal-view-goal-progress').on('show.bs.modal', function (e) {
        console.log(accordion)
        $(accordion).accordion({
            heightStyle: 'content',
            collapsible: true,
        })
    })
}
