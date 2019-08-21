import React, { Component, Fragment } from "react";
import { connect } from 'dva';
import { Menu, Drodowm, Icon, Select, Tabs } from 'antd';
import { Card, Row,Divider } from 'antd';
import styles from './ErrorInfo.less';
import StandardTable from 'components/StandardTable';
import moment from 'moment';
import {
    Bar,
    BaseBar,
    TimelineChart,
    BaseLine
} from 'components/Charts';
const { Option } = Select;
@connect(({ errorInfo, loading, }) => ({
    errorInfo: errorInfo,
    loading: loading.effects['errorInfo/fetch'],
}))
class ErrorInfo extends Component {
    //长事件响应可以table+热力图
    state ={
        selectedRows: [],
    };
    componentDidMount() {
        this.props.dispatch({
            type: 'errorInfo/fetch',
            payload: {
                days: 1
            }
        });
        this.props.dispatch({
            type: 'errorInfo/fetchTable',
            payload: {
                limit:5,
                offset:0
            }
        });
    }
    handleSelectRows =rows=>{
        console.log(rows);
    }
    handleStandardTableChange =(pagination, filtersArg, sorter) =>{
        this.props.dispatch({
            type: 'errorInfo/fetchTable',
            payload: {
                limit:pagination.pageSize,
                offset:pagination.pageSize *(pagination.current-1) 
            }
        });
    }
    render() {
        
        const columns = [ {
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '描述',
        dataIndex: 'exd',
      },
    //   {
    //     title: '服务调用次数',
    //     dataIndex: 'callNo',
    //     sorter: true,
    //     align: 'right',
    //     render: val => `${val} 万`,
    //     // mark to display a total number
    //     needTotal: true,
    //   },
    //   {
    //     title: '状态',
    //     dataIndex: 'status',
    //     filters: [
    //       {
    //         text: status[0],
    //         value: 0,
    //       },
    //       {
    //         text: status[1],
    //         value: 1,
    //       },
    //       {
    //         text: status[2],
    //         value: 2,
    //       },
    //       {
    //         text: status[3],
    //         value: 3,
    //       },
    //     ],
    //     onFilter: (value, record) => record.status.toString() === value,
    //     render(val) {
    //       return <Badge status={statusMap[val]} text={status[val]} />;
    //     },
    //   },
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
        const { errorInfo, loading } = this.props;
        const { selectedRows } = this.state;
        console.log(this.props);
        // console.log(errorInfo);
        let { daysData,
            errorInfoData,
            errorInfoTableData
        } = errorInfo;

        const callback = (e, h, cm) => {
            console.log(e, h, cm)
            this.props.dispatch({
                type: 'errorInfo/fetch',
                payload: {
                    days: e
                }
            });
        }

        let options = [];
        errorInfo.daysData.arr.map((item) => {
            if (item == 1) {
                options.push(<Option key={item} value="1">今天</Option>)
            } else {
                options.push(<Option key={item} value={item}>过去{item}天</Option>)
            }
        });

        let salesData = errorInfoData;
        return (<Fragment>
            <Card >
                <div className={styles.salesCard} >
                    <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                        <TabPane tab="tabel" key="sales">
                            <StandardTable
                                selectedRows={selectedRows}
                                loading={loading}
                                data={errorInfoTableData}
                                columns={columns}
                                onSelectRow={this.handleSelectRows}
                                onChange={this.handleStandardTableChange}
                            />
                        </TabPane>
                        <TabPane tab="对比" key="views">
                            <Card>
                                {salesData.length > 0 ?
                                    (<div style={{ padding: '0 24px' }}>
                                        <Bar height={295} title="错误次数" data={salesData} />
                                    </div>) : 0
                                }
                            </Card>
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
export default ErrorInfo;