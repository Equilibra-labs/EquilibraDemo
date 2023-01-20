// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface ILockManager {
    /**
     * @notice Check if `_user`'s lock by `_lockManager` can be unlocked
     * @param _user Owner of lock
     * @param _amount Amount of locked tokens to unlock
     * @return Whether given user's lock can be unlocked
     */
    function canUnlock(address _user, uint256 _amount) external view returns (bool);
}
