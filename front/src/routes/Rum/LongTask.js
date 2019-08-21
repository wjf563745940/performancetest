import React, { Component, Fragment } from "react";
import { connect } from 'dva';
import { Menu, Drodowm, Icon, Select, Tabs } from 'antd';
import { Card, Row, Divider } from 'antd';
import styles from './LongTask.less';
import DataSet from "@antv/data-set";
import StandardTable from 'components/StandardTable';
import moment from 'moment';
import { Chart, Axis, Tooltip, Geom ,Legend} from 'bizcharts';
// import $ from "jquery";
import {
    BaseHot,
    Bar,
    BaseBar,
    TimelineChart,
    BaseLine
} from 'components/Charts';
const { Option } = Select;

@connect(({ longTask, loading, }) => ({
    longTask: longTask,
    loading: loading.effects['longTask/fetch'],
}))
class LongTask extends Component {
    //长事件响应可以table+热力图
    state = {
        selectedRows: [],
    };
    componentDidMount() {
        this.props.dispatch({
            type: 'longTask/fetch',
            payload: {
                days: 3
            }
        });
        this.props.dispatch({
            type: 'longTask/fetchTable',
            payload: {
                limit: 5,
                offset: 0
            }
        });
    }
    handleSelectRows = rows => {
        console.log(rows);
    }
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        this.props.dispatch({
            type: 'longTask/fetchTable',
            payload: {
                limit: pagination.pageSize,
                offset: pagination.pageSize * (pagination.current - 1)
            }
        });
    }
    render() {

        const columns = [{
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '时长(ms)',
            dataIndex: 'ev',
        },
        {
            title: '更新时间',
            dataIndex: 'updated_at',
            sorter: true,
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
            title: '操作',
            render: () => (
                <Fragment>
                    <a href="">配置</a>
                    <Divider type="vertical" />
                    <a href="">订阅警报</a>
                </Fragment>
            ),
        },
        ];
        const { TabPane } = Tabs;
        const { longTask, loading } = this.props;
        const { selectedRows } = this.state;
        console.log(this.props);
        // console.log(errorInfo);
        let { daysData,
            longTaskData,
            longTaskTableData
        } = longTask;

        const callback = (e, h, cm) => {
            console.log(e, h, cm)
            this.props.dispatch({
                type: 'longTask/fetch',
                payload: {
                    days: e
                }
            });
        }
        let options = [];
        longTask.daysData.arr.map((item) => {
            if (item == 1) {
                options.push(<Option key={item} value="1">今天</Option>)
            } else {
                options.push(<Option key={item} value={item}>过去{item}天</Option>)
            }
        });
        console.log(longTaskData)
        let longTaskData2=[[1,1,1]]
        return (<Fragment>
            <Card >
                <div className={styles.salesCard} >
                    <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                        <TabPane tab="tabel" key="sales">
                            <StandardTable
                                selectedRows={selectedRows}
                                loading={loading}
                                data={longTaskTableData}
                                columns={columns}
                                onSelectRow={this.handleSelectRows}
                                onChange={this.handleStandardTableChange}
                            />
                        </TabPane>
                        <TabPane tab="对比" key="views">
                            <BaseHot data2={longTaskData}></BaseHot>
                            <Select defaultValue={daysData.selected} style={{ width: 100 }} onChange={callback}>
                                {
                                    options
                                }
                            </Select>
                        </TabPane>
                    </Tabs>
                </div>
            </Card>

        </Fragment>)
    }
}
export default LongTask;