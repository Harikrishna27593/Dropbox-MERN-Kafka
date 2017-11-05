import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Userprofile extends Component {

    static propTypes = {
        images: PropTypes.array.isRequired
    };

    render(){

        return (
            <div>
                <table className = "table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Work</th>
                        <th>Education</th>
                        <th>Contact</th>
                        <th>Interests</th>
                        <th>Language_pref</th>

                    </tr>
                    </thead>
                    <tbody>

                    {this.props.details.map(tile => (
                        <tr key={tile.email}>
                            <td>{tile.name}</td>
                            <td>{tile.email}</td>
                            <td>{tile.work}</td>
                            <td>{tile.edu}</td>
                            <td>{tile.contact}</td>
                            <td>{tile.interests}</td>
                            <td>{tile.lang_pref}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }


}
export default (Userprofile);