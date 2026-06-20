function parseNumstatLine(line) {
	const parts = line.split('\t');

	if (parts.length < 3) {
		return null;
	}

	const insertions = parts[0] === '-' ? null : Number(parts[0]);
	const deletions = parts[1] === '-' ? null : Number(parts[1]);
	const path = parts.slice(2).join('\t');

	return {
		insertions: Number.isNaN(insertions) ? null : insertions,
		deletions: Number.isNaN(deletions) ? null : deletions,
		path,
	};
}

function parseCommitBlock(block) {
	const lines = block.replace(/\r\n/g, '\n').split('\n');
	const commit = {
		hash: '',
		parents: [],
		author_name: '',
		author_email: '',
		author_date: '',
		committer_name: '',
		committer_email: '',
		committer_date: '',
		subject: '',
		body: '',
		files: [],
	};

	let index = 0;

	while (index < lines.length) {
		const line = lines[index];

		if (line === '@@FILES@@') {
			index += 1;
			break;
		}

		const separatorIndex = line.indexOf('=');
		if (separatorIndex === -1) {
			index += 1;
			continue;
		}

		const key = line.slice(0, separatorIndex);
		const value = line.slice(separatorIndex + 1);

		if (key === 'body') {
			const bodyLines = [value];
			index += 1;

			while (index < lines.length && lines[index] !== '@@FILES@@') {
				bodyLines.push(lines[index]);
				index += 1;
			}

			commit.body = bodyLines.join('\n').replace(/\n$/, '');
			continue;
		}

		if (key === 'parents') {
			commit.parents = value ? value.split(' ').filter(Boolean) : [];
		} else if (Object.prototype.hasOwnProperty.call(commit, key)) {
			commit[key] = value;
		}

		index += 1;
	}

	while (index < lines.length) {
		const line = lines[index].trimEnd();

		if (!line) {
			index += 1;
			continue;
		}

		const fileEntry = parseNumstatLine(line);
		if (fileEntry) {
			commit.files.push(fileEntry);
		}

		index += 1;
	}

	return commit;
}

function parseGitDump(dumpText) {
	const normalized = String(dumpText || '').replace(/\r\n/g, '\n').trim();

	if (!normalized) {
		return { commits: [] };
	}

	const blocks = normalized
		.split(/\n@@COMMIT@@\n/g)
		.map((block) => block.replace(/^@@COMMIT@@\n/, '').trim())
		.filter(Boolean);

	return {
		commits: blocks.map(parseCommitBlock),
	};
}

function dumpToJson(dumpText, space = 2) {
	return JSON.stringify(parseGitDump(dumpText), null, space);
}

function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function shortHash(value, length = 10) {
	const text = String(value || '');
	return text.length > length ? text.slice(0, length) : text;
}

globalThis.GitStatsUtils = {
	parseGitDump,
	dumpToJson,
	escapeHtml,
	shortHash,
};
