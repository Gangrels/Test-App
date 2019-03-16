import React, { Component } from 'react';
import { Table, Column, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css';
import {confOperations, confSelectors} from '../modules/conf';
import FewPeople from './FewPeople.js';
import SelectedConfs from './SelectedConfs.js';
import CustomDragLayer from './CustomDragLayer.js';
import Trash from './Trash.js';
import {connect} from 'react-redux';


class Conf extends Component {

    componentWillUnmount = () => {
        const { unmountPeople } = this.props;
        unmountPeople();
    }

    render() {
        const { lazyGetConfRequest, getPeople, isDragging } = this.props;
        const cursorStyle = isDragging ? {cursor: 'grab'} : null;

        return (
            <div style={cursorStyle} className='qwe'>
                <CustomDragLayer/>
                <h1>Conf</h1>
                <Trash></Trash>
                <FewPeople getPeople={getPeople}/>
                <SelectedConfs/>
                <button onClick={lazyGetConfRequest}>Get conferences</button>
                <ul>
                    {this.getBody()}
                </ul>
            </div>
        );
    }

    getBody = () => {
        const { confs, loadingConfs, loadedConfs } = this.props;
        if(!confs) return <b>There is no confs</b>
        if(!loadingConfs && confs.length === 0) return <b>There is no confs</b>
        const loadingBool = loadingConfs ? <b>Loading ... </b> : '';


        return (
            <div>
                {loadingBool}
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    rowCount={loadedConfs ? confs.length : confs.length + 1}
                    loadMoreRows={this.lazyLoadMoreRows}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <Table
                        ref={registerChild}
                        rowCount={confs.length}
                        overscanRowCount={1}
                        width={600}
                        height={300}
                        headerHeight={20}
                        rowHeight={30}
                        rowGetter={this.rowGetter}
                        onRowClick= {this.rowClick}
                        onRowsRendered={onRowsRendered}
                        >
                            <Column label='Id' dataKey='id' width={150} />
                            <Column label='Title' dataKey='title' width={150} />
                            <Column label='Url' dataKey='url' width={150} />
                            <Column label='When' dataKey='when' width={150} />
                        </Table>
                    )}
                </InfiniteLoader>
            </div>
        )
    }

    rowClick = ({rowData}) => this.selectEvent(rowData.id);

    rowGetter = ({ index }) => this.props.confs[index];

    lazyLoadMoreRows = () => {
        const { lazyGetConfRequest } = this.props;
        lazyGetConfRequest();
    }

    isRowLoaded = ({index}) => index < this.props.confs.length;

    selectEvent = (id) => {
        const { selectConf } = this.props;
        selectConf && selectConf(id);
    }

}

export default connect(
    state => {
        return {
          confs: confSelectors.getConfsFromImmutable(state),
          loadingConfs: confSelectors.loadingConfs(state),
          loadedConfs: confSelectors.loadedConfs(state),
        }
      },
      {
        getConfs: confOperations.getConfRequest,
        selectConf: confOperations.selectConf,
        lazyGetConfRequest: confOperations.lazyGetConfRequest,
      }
)(Conf)