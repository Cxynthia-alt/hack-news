"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;


/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const showStar = Boolean(currentUser);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        ${getDeleteBtn(story, currentUser) ? `<i class="fas fa-trash"></i>` : ""}
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

// ${showDeleteBtn ? getDeleteBtn() : ""}
// const showDeleteBtn = Boolean(currentUser.ownStories.length !== 0)
function getDeleteBtn(story, user) {
  return user.isOwnstories(story)
}

function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `<span class = "star">
            <i class="${starType} fa-star"></i>
          </span>`
}


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


//get data from new story form, call addStory and put new story to html

async function addNewStoryOnPage(evt) {
  console.debug("addNewStoryOnPage");
  evt.preventDefault();
  const author = document.querySelector('#newAuthor').value;
  const title = document.querySelector('#newTitle').value;
  const url = document.querySelector('#newUrl').value;
  const username = currentUser.username;
  const storyData = { title, url, author, username };


  const newStoryMarkup = await storyList.addStory(currentUser, storyData);
  const $newStory = generateStoryMarkup(newStoryMarkup);
  $allStoriesList.prepend($newStory);
}
$storyForm.on('submit', addNewStoryOnPage)
