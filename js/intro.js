jQuery(window).ready(function() {
    function startIntro(){
        var intro = introJs();
        intro.setOptions({
            steps: [{
                    element: jQuery('#txtplayers'),
                    intro: "Tapez les nom des joueurs de votre équipe participant au macth<br/>séparé par des virgule(,), point-virgule(;), espace( ) ou retour à la ligne. "
                },
                {
                    element: jQuery('.btnValidationJoueurs'),
                    intro: "Valider"
                }]
        });
        intro.start();
    }

    jQuery('#btnDemo').click(startIntro)
} )