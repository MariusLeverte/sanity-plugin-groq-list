# Sanity Plugin GROQ List

Take advantage of [GROQ](https://sanity-io.github.io/GROQ/draft/) to render lists of documents for quick edit, straight in the Sanity studio without needing to deploy anything. 

![GROQ List in Studio](https://cdn.sanity.io/images/wt6didsd/production/fcbe105b10a5460f96f524849617c0d0f146d86b-2870x1348.png?h=650)

## Features

- Quick create custom document lists
- Easier use for content creators
- No need for any deploying

## Installation

Run the following command in your studio folder using [the Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli):

```
sanity install groq-list
```

## Configuration

The plugin can be configured through `<your-studio-folder>/config/groq-list.json`:

```json
{
  "title": "TAB title"
}
```

## Examples

To fully take advantage of this plugin, take a look at the documentation for [GROQ](https://sanity-io.github.io/GROQ/draft/) or [quick cheat sheet](https://www.sanity.io/docs/query-cheat-sheet)

```
// Documents with same slug
*[defined(slug.current) && slug.current in *[_id != ^._id].slug.current]

// Documents with title longer than 10 characters
*[_type == "movie" && length(title) > 10]

// Documents with 6 or more castMembers
*[_type == "movie" && count(castMembers) >= 6]
```

## License

MIT © Marius Djerv
See LICENSE
