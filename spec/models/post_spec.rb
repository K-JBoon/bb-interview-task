require 'rails_helper'

describe Post, "#mediaclip_id" do
  let(:id) { 1 } 

  subject { Post.find(id).mediaclip_id }

  context "when the ID is 1" do
    let(:id) { 1 }

    it { is_expected.to eq 3888510 }
  end

  context "when the ID is 30" do
    let(:id) { 30 }

    it { is_expected.to eq 3792503 }
  end

  context "when the ID is 99" do
    let(:id) { 99 }

    it { is_expected.to eq 3888500 }
  end

  context "when the ID has no associated value" do
    let(:id) { 100 }

    it { is_expected.to eq nil }
  end
end