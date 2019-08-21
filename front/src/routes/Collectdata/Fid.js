import React, { Component, Fragment } from "react";
// import D3Array from 'components/D3Array';
// import styles from './Array.less';
import { connect } from 'dva';
import styles from './Fid.less';
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

@connect(({ fid, loading }) => ({
    fid,
    loading: loading.effects['fid/fetch'],
}))
class Fid extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'fid/fetch',
            payload:{
                days:1
            }
        });
    }

    render() {
        const { fid, loading } = this.props;
        let {daysData} =fid;
        let titleinfo={ y1: 'Fid(<50ms)' };

        const callback = (e, h, cm) =>{
            console.log(e, h, cm)
         //   daysData.selected=e*1;
            titleinfo={y1:'test'};
            this.props.dispatch({
                type: 'fid/fetch',
                payload:{
                    days:e
                }
            });
        }

        console.log(this.props)
  
        const {

            // offlineChartData,
            timesData,
            fidData,
        } = fid;
        let options = [];
        fid.daysData.arr.map((item) => {
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
                {fidData.length > 0 ?
                    (<div style={{ padding: '0 24px' }}>

                        <BaseLine
                            height={400}
                            data={fidData}
                            titleMap={titleinfo}
                            days={daysData.selected}
                        />

                    </div>) : 0
                }
            </Card>
           
            <Select defaultValue={daysData.selected} style={{ width: 100 }} onChange={callback}> 
                {options}
              </Select>
        </Fragment>)

    }
}
export default Fid