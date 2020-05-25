/* eslint-disable */
function Sound() {

}

Sound.playSfx = function (sfx) {
  var audio = Tiny.audio.manager.getAudio(sfx);
  audio.play();
};

Sound.playBlockHitSound = function () {
  this.playSfx(RESOURCES['s_block_hit_ogg']);
};

Sound.playsDeathJingleSound = function () {
  this.playSfx(RESOURCES['s_death_jingle_ogg']);
};

Sound.playFallThudSound = function () {
  this.playSfx(RESOURCES['s_fall_thud_ogg']);
};

Sound.playFootLoopFastSound = function () {
  this.playSfx(RESOURCES['s_foot_loop_fast_ogg']);
};

Sound.playFootLoopRegularSound = function () {
  this.playSfx(RESOURCES['s_foot_loop_regular_ogg']);
};

Sound.playHyperModeSound = function () {
  this.playSfx(RESOURCES['s_hyper_mode_ogg']);
};

Sound.playLavaSploshSound = function () {
  this.playSfx(RESOURCES['s_lava_splosh_ogg']);
};

Sound.playPickupGrabSound = function () {
  this.playSfx(RESOURCES['s_pickup_grab_ogg']);
};
