import React from 'react';
const ProfileList = (props) => {
    let { list } = props;
    return (<React.Fragment>
        <div className="list">
            {list.map((follower) => {
                return (
                    <div className="card" key={follower.uid}>
                        <div className="handle">{follower.handle}</div>
                        <div className="name">{follower.name}</div>
                        <div className="name">{follower.uid}</div>
                    </div>
                )
            })}
        </div>
    </React.Fragment>);
}
export default ProfileList;