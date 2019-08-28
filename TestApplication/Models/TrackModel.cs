using System;

namespace TestApplication.Models
{
    public class TrackModel
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public TimeSpan Duration { get; private set; }
        public bool IsFavorite { get; private set; }
        public bool IsListened { get; private set; }
        public int Like { get; private set; }
        public int Dislike { get; private set; }

        public TrackModel() { }
    }
}