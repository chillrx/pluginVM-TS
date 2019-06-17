import { h, Component } from 'preact';

export default class PluginVM extends Component {

    render() {
        return <div style={containerPluginVM}>
            <button id="buttonPluginVM" onClick={_ => this.makeChanges()}>Executar plugin</button>
        </div>;
    }

    makeChanges = () => {
        let aux, temp, filterFunction, filteredTree, textNodes = [];

        filterFunction = node => {
            return (node.nodeType === 3 && node.textContent.trim() !== '' && node.parentNode.id != 'buttonPluginVM') || node.tagName == "IMG" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        };

        temp = /MSIE|Trident/.test(navigator.userAgent) ? filterFunction : {
            acceptNode: filterFunction
        };

        filteredTree = document.createTreeWalker(document.body, NodeFilter.SHOW_ALL, temp, false);

        while (aux = filteredTree.nextNode())
        textNodes[textNodes.length] = aux;

        for (let i = textNodes.length - 1; i >= 0; i--) {
            const element = textNodes[i];

            this.setFontSize(element.parentNode);

            this.setFontFamily(element.parentNode);

            if (element.tagName === 'A')
                this.setHighlightsInLinks(element.parentNode);

            if (element.tagName == "IMG" && !element.getAttribute('alt'))
                this.setHighlightsInImages(element);
        }

    }

    private setFontSize(element) {
        element.style.setProperty('font-size', parseFloat(getComputedStyle(element).fontSize) * 1.2 + 'px');
    }

    private setFontFamily(element) {
        element.style.setProperty('font-family', 'Arial');
    }

    private setHighlightsInLinks(element) {
        element.style.setProperty('background-color', '#FFE599');
        element.style.setProperty('text-decoration', 'underline');
        element.style.setProperty('font-style', 'italic');
    }

    private setHighlightsInImages(element) {
        element.style.setProperty('border', '5px dotted red');
    }

}

const containerPluginVM = {
    'width': '100%',
    'display': 'flex',
    'justify-content': 'center',
    'position': 'fixed',
    'z-index': 2,
    'bottom': '10px'
}