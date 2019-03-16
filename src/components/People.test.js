import React, { Component } from 'react';
import { configure, mount, shallow, render } from 'enzyme';
import mocks from '../mocks/conferences.js';
import People from './People.js';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })

const eventList = mocks.map(event => ({...event, id: Math.random()}));
const store = {};

describe('people tests', ()=> {
    describe('People component test', ()=> {
        it('should render component', ()=> {
            const comp = shallow(
                <People allPeople={eventList.slice(0, 5)} loadedPeople />
            )

           expect((comp.contains('.test-component')))
        })
    })
})