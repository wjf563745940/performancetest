import React, { Component, Fragment } from "react";
// import D3Array from 'components/D3Array';
// import styles from './Array.less';
import { connect } from 'dva';
import styles from './Fp.less';
import { Menu, Dropdown, Icon ,Select} from 'antd';
import {
    // Row,
    // Col,

    Card,

} from 'antd';
import {
    BaseBar,
    TimelineChart,
    BaseLine
} from 'components/Charts';

const { Option } = Select;

@connect(({ fp, loading }) => ({
    fp,
    loading: loading.effects['fp/fetch'],
}))
class Fp extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'fp/fetch',
            payload:{
                days:1
            }
        });
    }

    render() {
        // const salesData = [];
        // for (let i = 0; i < 12; i += 1) {
        //   salesData.push({
        //     x: `${i + 1}月`,
        //     y: Math.floor(Math.random() * 1000) + 200,
        //   });
        // }
        let defaultday = ' 过去7天';
        const callback = (e, h, cm) =>{
            console.log(e, h, cm);
            this.props.dispatch({
                type: 'fp/fetch',
                payload:{
                    days:e
                }
            });
        }

        console.log(this.props)
        const { fp, loading } = this.props;
        let {daysData} =fp;
        const {
            timesData,
            offlineChartData,
            fpData,
        } = fp;
        let options = [];
        fp.daysData.arr.map((item) => {
            if (item == 1) {
                options.push(<Option key={item} value="1">今天</Option>)
            } else {
                options.push(<Option key={item} value={item}>过去{item}天</Option>)
            }
        });
        return (<Fragment>
            <Card
                loading={loading}
                className={styles.offlineCard}
                bordered={false}
                bodyStyle={{ padding: '0 0 32px 0' }}
                style={{ marginTop: 32 }}
            >
                {fpData.length > 0 ?
                    (<div style={{ padding: '0 24px' }}>

                        <BaseLine
                            height={400}
                            data={fpData}
                            titleMap={{ y1: 'fp', y2: 'fcp(pc小于1s，如果过长 网络有可能有问题，或者资源太过庞大)' }}
                            days={daysData.selected}
                        />

                    </div>) : 0
                }
            </Card>
            <Card>
            <BaseBar height={295} title="内容可见时间分布" data={timesData} />

            </Card>
            <Select defaultValue={daysData.selected} style={{ width: 100 }} onChange={callback}> 
               {options}
              </Select>
              <div>统计下 不同时间的分布</div>
        </Fragment>)

    }
}
export default Fp