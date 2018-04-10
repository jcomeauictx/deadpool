pragma solidity ^0.4.19;

/* 
 * allows betting on celebrity (or other) deaths, including one's own as
 * a form of self-insurance, that of TV show characters, or that of tyrants
 * (google 'assassination markets') to encourage them to go into hiding.
 */

contract Deadpool {
    // note: uint is alias for uint256

    // state
    uint maxTargets;

    // events
    event LogMessage(string message);

    // constructor
    /* turns out if you don't pass arguments to constructor, it doesn't
     * fail but the variables are uninitialized, which in the case of uint
     * means they are 0.
     */
    function Deadpool(uint maximum) public {
        maxTargets = maximum > 0 ? maximum : 40;
        emit LogMessage("lottery registered");
    }

    // allow checking length of array from outside
    function totalTargets() public view returns (uint) {
        return targets.length;
    }

    // let someone place a bet
    function bet() public payable {
        require targets.length < maxTargets;
    }
}
/* vim: set tabstop=4 expandtab shiftwidth=4 softtabstop=4: */
