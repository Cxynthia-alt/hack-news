"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  // console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** show new story form when a user clicks on 'submit'  */
function addNewStory(evt) {
  console.debug('addNewStory');
  $allStoriesList.hide();
  $storyForm.show();
}
$navSubmit.on("click", addNewStory)


//add new stories to my stories
function updateFavoriteStories(evt) {
  console.debug('updateFavoriteStories')
  hidePageComponents();
  for (let fav of currentUser.favorites) {
    const $favStory = generateStoryMarkup(fav);
    $favoriteStoryList.append($favStory)
  }
  $favoriteStoryList.show();
}
$favoriteStoryBtn.on('click', updateFavoriteStories)


// show stories created by login user
function showUserStories(evt) {
  hidePageComponents();
  for (let ownStory of currentUser.ownStories) {
    const $ownStory = generateStoryMarkup(ownStory);
    $myStoryList.append($ownStory)
  }
  $myStoryList.show();
}
$myStoryBtn.on('click', showUserStories)
