///<reference path='../typings/references.ts' />

class VT {

    /**
     * Find Components in DOM
     */
    public fetchComponents() {
        let components = jQuery('[data-component]');

        if (components.length > 0) {
            jQuery.each(components, (i, element) => {
                const $element = jQuery(element);
                this.registerComponent($element);
            });
        }
    }

    /**
     * Register Component & run Class
     * @param $element
     */
    private registerComponent($element) {
        const componentName = $element.attr('data-component');
        const config = {
            name: componentName,
            className: this.getClassName(componentName) + 'Component',
            element: $element
        };

        function isConstructor(f) {
            try {
                new f();
            } catch (err) {
                if (err.message.indexOf('is not a constructor') >= 0) {
                    console.error('Unable to Init Component');
                    return false;
                }
            }
            return true;
        }

        if (isConstructor(window[config.className])) {
            let component = new window[config.className]();
            component.init();
        }

    }


    /**
     * get ClassName for Component, Widget etc
     * @param elementName
     */
    private getClassName(elementName) {
        let className: string = elementName;

        function capitalize(str: string): string {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        if (elementName.indexOf('/') > 0) {
            let fullClassName = '';
            elementName.split('/').forEach(p => fullClassName += capitalize(p));

            className = fullClassName;
        }

        return className;
    }
}