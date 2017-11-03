import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import axios from 'axios';
import swal from 'sweetalert';
import * as API from '../api/API';
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    subheader: {
        width: '100%',
    },
});



class UploadedFiles extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        images: PropTypes.array.isRequired
    };


    componentDidMount() {
        API.getImages()
            .then((data) => {
                console.log(data);
                this.setState({
                    images_here: data
                });
                // console.log(this.state.images_here)
            });
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(this.state.images_here)
    }

    constructor(props) {
        super(props);
        this.state = {
            images_here: [],
        };
    }


    componentWillReceiveProps(props){
        this.setState({images_here:props.images});
        //console.log(this.state.images_here);
    }

    handleStar = (path) => {
        var res={};
        res.path=path
        API.star(res)
            .then((status) => {
                if (status === 204) {
                API.getImages()
                    .then((data) => {
                        console.log(data);
                        this.setState({
                            images_here: data
                        });
                         //console.log(this.state.images_here)
                    });

                console.log('starred successfully')
            };
    });
    };

    handleUnStar = (path) => {
        var res={};
        res.path=path
        API.Unstar(res)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            console.log(data);
                            this.setState({
                                images_here: data
                            });
                            //console.log(this.state.images_here)
                        });

                    console.log('unstarred successfully')
                };
            });
    };


    handleShare = (path) => {
        swal("Enter Email to share:", {
            content: "input",
        }).then((value) => {
        var res={};
        res.path=path;
        res.email=value;
        API.Share(res)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            console.log(data);
                            this.setState({
                                images_here: data
                            });
                            //console.log(this.state.images_here)
                        });

                    console.log('Shared successfully')
                };
            });
            swal(`File share Successfull`);
    });
    };

    handleDelete = (path,permission) => {
        if (permission == '0') {
            swal(`Deletion Denied.No Permission to delete`);
        }
        else {
            var res = {};
            res.path = path
            res.permission = permission
            API.deletefile(res)
                .then((status) => {
                    if (status === 204) {
                        API.getImages()
                            .then((data) => {
                                console.log(data);
                                this.setState({
                                    images_here: data
                                });
                                //console.log(this.state.images_here)
                            });

                        console.log('Deleted successfully')
                    }
                    ;
                });
        }
    };


    render(){
        const classes = this.props;
        return (
            <div className={classes.root}>
                <table className = "table table-hover">
                    <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Modified Date</th>
                        <th>Status</th>
                        <th>Select</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.images_here.map(tile => (
                        <tr key={tile.img} cols={tile.cols || 1}>
                            {tile.isdirec==='0' ? <td className={'tablefield'}> <a href={'http://localhost:3001/uploads/'+tile.img} download >{tile.img}</a></td> :<td className={'tablefield'}> <a onClick={() => this.sendfoldername(tile.img)} ><span><img src="http://files.softicons.com/download/system-icons/rhon-icons-by-harenome-razanajato/png/512x512/folder-blue.png" height="20"/></span>{tile.img}</a></td>}
                            <td className={'tablefield'}>{tile.timer}</td>
                            <td className={'tablefield'}>{tile.starred}</td>
                            <td className={'tablefield'}> <div className="dropdown">
                                <button className="dropbtn">...</button>
                                <div className="dropdown-content">
                                    <button className="btn btn-light" onClick={() => this.handleStar(tile.img)}>Star</button>
                                    <button className="btn btn-light" onClick={() => this.handleUnStar(tile.img)}>UnStar</button>
                                    <button className="btn btn-light" onClick={() => this.handleShare(tile.img)}>Share </button>
                                    <button className="btn btn-light" onClick={() => this.handleDelete(tile.img,tile.permission)}>Delete</button>

                                </div>

                            </div></td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }


}
export default withStyles(styles)(UploadedFiles);