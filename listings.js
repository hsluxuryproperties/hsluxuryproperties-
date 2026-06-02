/**
 * listings.js — Shared data layer for HS Real Estate
 * Listings are stored in localStorage so they persist across pages.
 * The admin page (admin.html) is the only place to add/edit/delete listings.
 */

const LS_KEY = 'hs_listings';

function getListings() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveListings(listings) {
  localStorage.setItem(LS_KEY, JSON.stringify(listings));
}

function getListingById(id) {
  return getListings().find(l => l.id === id) || null;
}

function addListing(listing) {
  const listings = getListings();
  listing.id = 'hs_' + Date.now();
  listing.createdAt = new Date().toISOString();
  listings.push(listing);
  saveListings(listings);
  return listing;
}

function updateListing(id, data) {
  const listings = getListings();
  const idx = listings.findIndex(l => l.id === id);
  if (idx === -1) return false;
  listings[idx] = { ...listings[idx], ...data };
  saveListings(listings);
  return true;
}

function deleteListing(id) {
  const listings = getListings().filter(l => l.id !== id);
  saveListings(listings);
}
