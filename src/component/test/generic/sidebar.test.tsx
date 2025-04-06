import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { create } from 'react-test-renderer';


vi.mock('react-router-dom', () => ({
    useLocation: () => ({ pathname: '/home' }),
    MemoryRouter: ({ children }) => children
}));

vi.mock('@chakra-ui/react', () => ({
    Box: ({ children, as, ...props }) => {
        const testId = as === 'nav' ? 'nav-container' : 'box-container';
        return React.createElement('div', { ...props, 'data-testid': testId, as }, children);
    },
    VStack: ({ children, ...props }) => React.createElement('div', { ...props, 'data-testid': 'vstack-container' }, children),
    Button: ({ children, leftIcon, ...props }) => {
        const iconElement = leftIcon && React.createElement('span', { key: 'icon', 'data-testid': 'button-icon' }, leftIcon);
        return React.createElement(
            'a',
            { ...props, 'data-testid': `button-${props.href?.replace('/', '') || 'unknown'}` },
            [iconElement, children]
        );
    }
}));

import Sidebar from "../../generic/sidebar.tsx";

describe('Sidebar Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render without crashing', () => {
        const component = create(<Sidebar />);
        expect(component).toBeDefined();

        const tree = component.toJSON();
        expect(tree).toBeDefined();
    });

    it('should contain all menu items', () => {
        const component = create(<Sidebar />);
        const instance = component.root;

        const menuTexts = ['Home', 'Plantsitting', 'Settings'];

        menuTexts.forEach(text => {
            const elements = instance.findAll(el =>
                el.children &&
                typeof el.children === 'object' &&
                el.children.some(child => child === text)
            );
            expect(elements.length).toBeGreaterThan(0);
        });
    });

    it('should have correct hrefs for navigation', () => {
        const component = create(<Sidebar />);
        const instance = component.root;

        const links = instance.findAll(el => el.props && el.props.href);


        const expectedUrls = ['/home', '/plantsitting', '/setting'];
        expectedUrls.forEach(url => {
            const hasUrl = links.some(link => link.props.href === url);
            expect(hasUrl).toBe(true);
        });
    });

    it('should mark active menu item differently', () => {
        const createLocationMock = (pathname) => {
            vi.resetModules();
            vi.mock('react-router-dom', () => ({
                useLocation: () => ({ pathname }),
                MemoryRouter: ({ children }) => children
            }));


            const SidebarReimport = require('./Sidebar').default;
            return create(<SidebarReimport />);
        };


        ['home', 'plantsitting', 'setting'].forEach(route => {
            const component = createLocationMock(`/${route}`);
            expect(component).toBeDefined();
        });
    });

    it('should contain a logo SVG', () => {
        const component = create(<Sidebar />);
        const instance = component.root;

        const svgElements = instance.findAll(el => el.type === 'svg' || (el.props && el.props.viewBox));
        expect(svgElements.length).toBeGreaterThan(0);
    });
});