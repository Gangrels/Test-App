import React, { Component } from 'react';
import {connect} from 'react-redux';
import { confSelectors } from '../modules/conf'
import { List } from 'react-virtualized';
import SelectedConfCard from './SelectedConfCard';
import { TransitionMotion, spring } from 'react-motion';

class SelectedConfs extends Component {
    state = {  }
    render() {

        return (
            <TransitionMotion
                styles={this.getStyles}
                willLeave={this.willLeave}
                willEnter={this.willEnter}
            >
                {interpolatedStyles => {
                    return (
                            <div style={{border: '1px solid black', minHeight: '70px'}}>
                                    <List
                                    width={600}
                                    height={200}
                                    rowCount={interpolatedStyles.length}
                                    rowHeight={150}
                                    rowRenderer={ this.rowRenderer(interpolatedStyles) }
                                    />
                            </div>
                        )
                    }
                }
            </TransitionMotion>
        );
    }

    getStyles = () => {
        const { events } = this.props;

        return events.map((event, index)=>({
            key: index,
            data: event,
            style: {opacity: spring(1, { stiffness: 50, damping: 40 })}
        }))
    }

    rowRenderer = (interpolatedStyles) => ({key, index, style}) => {

        const rowCtx = interpolatedStyles[index]

        return (
            <div key={rowCtx.key} style={{...style, ...rowCtx.style}}>
                <SelectedConfCard event={rowCtx.data} />
            </div>
        )
    }

    willLeave = () => ({
        opacity: spring(0, {stiffness: 50, damping: 40})
      })

    willEnter = () => ({
        opacity: 0
    })
}

export default connect(
    (state) => ({
        events: confSelectors.getSelectedEvents(state),
    })
)(SelectedConfs);