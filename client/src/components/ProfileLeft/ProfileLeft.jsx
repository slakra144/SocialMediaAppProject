import React from 'react'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSeacrh/LogoSearch'
import FollowersCard from '../FollowersCard/FollowersCard'

const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <InfoCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft